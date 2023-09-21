from docker import from_env

docker_engine = from_env()


def get_docker_images():
    return __get_docker_images()


def get_docker_containers():
    return __get_docker_containers()


def pull_image(repository):
    try:
        __pull_image(repository)
    except:
        return False
    return True


def remove_image(imageName, force=True):
    __remove_image(imageName, force)


def run_image(imageName, command, ports, detach=True, tty=True):
    __run_image(imageName, command, ports, detach, tty)


##########################################################
# helpers functions
##########################################################
def __get_docker_images():
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


def __get_docker_containers():
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


def __pull_image(repository):
    docker_engine.images.pull(repository)


def __remove_image(imageName, force):
    docker_engine.images.remove(imageName, force)
