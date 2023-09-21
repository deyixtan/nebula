from docker import from_env

docker_engine = from_env()


def get_docker_images():
    return _get_docker_images()


def get_docker_containers():
    return _get_docker_containers()


##########################################################
# helpers functions
##########################################################
def _get_docker_images():
    images = docker_engine.images.list()
    if len(images) <= 0:
        return []
    return list(
        map(
            lambda x: {
                "imageId": x.id,
                "imageName": x.tags[0] if len(x.tags) > 0 else "",
            },
            images,
        )
    )


def _get_docker_containers():
    containers = docker_engine.containers.list()
    if len(containers) <= 0:
        return []
    return list(
        map(
            lambda x: {
                "containerId": x.id,
                "containerImage": x.image.tags[0] if len(x.image.tags) > 0 else "",
                "containerName": x.name,
                "containerStatus": x.status,
            },
            containers,
        )
    )
