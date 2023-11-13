# ecms

A content management system that can be used to quickly create a website consisting of wiki pages/sections and galleries. At present this is mostly geared towards my own needs and not intended for wider distribution and use.

This repository provides configuration and docker-compose settings to allow an ecms website to be quickly spun up with minimal configuration.

## Getting Started

### Clone the repository

Clone the repository, and init submodules.

### Configure

Take a copy of the `.env-template` file and rename it to `.env`. Set the following variables appropriately. Some default values are provided but all variables must contain valid values in order for docker to start the services:

- `DOCKER_IDENTIFIER`: An identifier unique on the current host (since it's used in the container names). For example, I use this repository for two actual websites and also run a development version, so each of these have different identifiers. This enables the images to be built independently of one another and to be easily identified when running `docker ps`.
- `DOCKER_PORT`: The port that is exposed to the host machine by docker. N.B. The nginx image on which this is based also exposes, but does not use, port 80.
- `UI_URL`: The full url that is used to access the ui. For example, if you just want to use the application locally, you might use the default http://localhost:3000. However, if you are exposing this to the internet (and forwarding requests to the docker container with a reverse proxy) you will need to provide the fully qualified domain name used by external requests.
- `UI_QUERY_REFETCH_INTERVAL`: The interval after which the ui considers data from the api to be stale and refetches it (in ms).
- `API_DATA_DIR`: The directory on the host machine where the api will find its content files. Please note that the api will also need write access to this directory.
- `STORAGE_WRITE_UID`: The uid that is applied to any created directories and created/updated files -- leave empty to stop ownership being amended (N.B. process must be run as root for this to work)
- `STORAGE_WRITE_GID`: The gid that is applied to any created directories and created/updated files -- leave empty to stop ownership being amended (N.B. process must be run as root for this to work)
- `ENABLE_AUTHENTICATION`: Set to "true" to enable site-wide authentication (though guest access is still permitted for unrestricted pages). Set to "false" to ignore all restrictions and hide authentication options in the UI.
- `JWT_REFRESH_EXPIRES`: The amount of time after which the JWT refresh token expires (default 5 days)
- `JWT_ACCESS_EXPIRES`: The amount of time after which the JWT access token expires (default 30 minutes)
- `JWT_REFRESH_SECRET`: A secret used to prevent unauthorised refresh tokens from being created. Any sufficiently random string will do.
- `JWT_ACCESS_SECRET`: A secret used to prevent unauthorised access tokens from being created. Any sufficiently random string will do.

### A Note on Symbolic Links

Docker doesn't handle symbolic links very well, since it can't see any of the host file system's files that outside of the mapped volume. If any of your content directories include symbolic links, you must create one or more additional volumes within docker-compose. You can do this by creating a new file `docker-compose.override.yml`, containing additional instructions (this file will be automatically picked up when you bring the containers up). For example, where `/path/to/target/directory` is the path that the link points to, include the following content:

```
services:
  api:
    volumes:
      - /path/to/target/directory:/path/to/target/directory:read-only
```

In this case, I have made the target volume read-only, but this is not necessary.

### Add Some Content

You will need to do this yourself, but some samples are provided (in the content-samples directory) to get you started. See the following section for more information about how to do this.

To try one of the samples, simply copy the contents of one of the sample directories (the `content` and `admin` directories, not the parent) into the data directory in this repository and start the services (see below).

### Start/Stop The Service

To start the docker containers, just run

```
docker-compose up -d
```

To start the containers after rebuilding the images (for example after pulling new changes from git), run

```
docker-compose up -d --build
```

To stop the containers, run

```
docker-compose down
```

## Creating Content

TBC

### Component Definitions and Directories

TBC

### Markdown Components

TBC

### Gallery Components

TBC
