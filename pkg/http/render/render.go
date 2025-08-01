package render

import (
	"net/http"

	"github.com/SigNoz/signoz/pkg/errors"
	jsoniter "github.com/json-iterator/go"
)

const (
	// Non-standard status code (originally introduced by nginx) for the case when a client closes
	// the connection while the server is still processing the request.
	statusClientClosedConnection = 499
)

var json = jsoniter.ConfigCompatibleWithStandardLibrary

type response struct {
	Status string         `json:"status"`
	Data   interface{}    `json:"data,omitempty"`
	Error  *responseerror `json:"error,omitempty"`
}

type responseerror struct {
	Code    string                    `json:"code"`
	Message string                    `json:"message"`
	Url     string                    `json:"url,omitempty"`
	Errors  []responseerroradditional `json:"errors,omitempty"`
}

type responseerroradditional struct {
	Message string `json:"message"`
}

func Success(rw http.ResponseWriter, httpCode int, data interface{}) {
	body, err := json.Marshal(&response{Status: StatusSuccess.s, Data: data})
	if err != nil {
		Error(rw, err)
		return
	}

	if httpCode == 0 {
		httpCode = http.StatusOK
	}

	rw.Header().Set("Content-Type", "application/json")

	rw.WriteHeader(httpCode)
	_, _ = rw.Write(body)
}

func Error(rw http.ResponseWriter, cause error) {
	// See if this is an instance of the base error or not
	t, c, m, _, u, a := errors.Unwrapb(cause)

	// Derive the http code from the error type
	httpCode := http.StatusInternalServerError
	switch t {
	case errors.TypeInvalidInput:
		httpCode = http.StatusBadRequest
	case errors.TypeNotFound:
		httpCode = http.StatusNotFound
	case errors.TypeAlreadyExists:
		httpCode = http.StatusConflict
	case errors.TypeUnauthenticated:
		httpCode = http.StatusUnauthorized
	case errors.TypeUnsupported:
		httpCode = http.StatusNotImplemented
	case errors.TypeForbidden:
		httpCode = http.StatusForbidden
	case errors.TypeCanceled:
		httpCode = statusClientClosedConnection
	case errors.TypeTimeout:
		httpCode = http.StatusGatewayTimeout
	}

	rea := make([]responseerroradditional, len(a))
	for k, v := range a {
		rea[k] = responseerroradditional{v}
	}

	body, err := json.Marshal(&response{
		Status: StatusError.s,
		Error: &responseerror{
			Code:    c.String(),
			Url:     u,
			Message: m,
			Errors:  rea,
		},
	})
	if err != nil {
		// this should never be the case
		http.Error(rw, err.Error(), http.StatusInternalServerError)
		return
	}

	rw.WriteHeader(httpCode)
	_, _ = rw.Write(body)
}
