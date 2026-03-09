#!/bin/sh
# Replace the build-time placeholder with the runtime VITE_API_URL
if [ -n "$VITE_API_URL" ]; then
  find /usr/share/nginx/html -name '*.js' -exec sed -i "s|__API_URL_PLACEHOLDER__|${VITE_API_URL}|g" {} +
fi

exec "$@"
