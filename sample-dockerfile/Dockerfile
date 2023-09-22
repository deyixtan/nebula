# Use Alpine Linux as the base image
FROM alpine:latest

# Set environment variables
ENV DISPLAY=:1 \
    VNC_PORT=5900

# Install necessary packages
RUN apk update && apk add --no-cache \
    xfce4 \
    xfce4-terminal \
    x11vnc \
    supervisor \
    xvfb


# Create a supervisord configuration file
RUN echo "[supervisord]" > /etc/supervisord.conf && \
    echo "nodaemon=true" >> /etc/supervisord.conf && \
    echo "[program:xvfb]" >> /etc/supervisord.conf && \
    echo "command=Xvfb :1 -screen 0 1024x768x16" >> /etc/supervisord.conf && \
    echo "[program:x11vnc]" >> /etc/supervisord.conf && \
    echo "command=x11vnc -display :1 -rfbport ${VNC_PORT} -forever" >> /etc/supervisord.conf && \
    echo "[program:xfce4]" >> /etc/supervisord.conf && \
    echo "command=startxfce4" >> /etc/supervisord.conf

# Expose the VNC port
EXPOSE ${VNC_PORT}

# Start supervisord to manage the Xvfb, x11vnc, and Xfce processes
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
