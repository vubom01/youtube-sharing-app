package util

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func Test_StringToInt64(t *testing.T) {
	table := []struct {
		name     string
		input    string
		expected int64
	}{
		{
			name:     "error",
			input:    "xxx",
			expected: 0,
		},
		{
			name:     "success",
			input:    "123",
			expected: 123,
		},
	}

	for _, e := range table {
		t.Run(e.name, func(t *testing.T) {
			actual, _ := StringToInt64(e.input)
			assert.Equal(t, e.expected, actual)
		})
	}
}
