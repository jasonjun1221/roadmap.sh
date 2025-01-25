# 📦 Basic Dockerfile

A basic Dockerfile to create a Docker image.

## 🎯 Goals

- The Dockerfile should be named Dockerfile.
- The Dockerfile should be in the root directory of the project.
- The base image should be alpine:latest.
- The Dockerfile should contain a single instruction to print “Hello, Captain!” to the console before exiting.

## 📌 Bonus

- If you are looking to build a more advanced version of this project, you can consider adding the ability to pass your name to the Docker image as an argument, and have the Docker image print “Hello, [your name]!” instead of “Hello, Captain!”.

## 🔗 Link

- https://roadmap.sh/projects/basic-dockerfile

### 1. Build the Docker image

```bash
docker build -t basic-dockerfile .
```

### 2. Run the Docker image

```bash
docker run -e name=John basic-dockerfile
```
