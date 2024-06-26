from docker import from_env
from os import makedirs
from shutil import unpack_archive
from uuid import uuid4

docker_engine = from_env()


def get_docker_images():
    return __get_docker_images()


def get_docker_containers():
    return __get_docker_containers()


def get_container_logs(containerName):
    return __get_container_logs(containerName)


def pull_image(repository):
    try:
        __pull_image(repository)
    except:
        return False
    return True


def import_build_image(image_name, archive_bytes):
    random_id = uuid4().hex
    file_path = "/tmp/nebula/uploads/" + random_id
    makedirs(file_path, exist_ok=True)
    makedirs(file_path + "/extract", exist_ok=True)

    zip_path = file_path + "/archive.zip"
    zip_archive = open(zip_path, "wb")
    zip_archive.write(archive_bytes)
    zip_archive.close()

    extraction_path = file_path + "/extract"
    unpack_archive(zip_path, extraction_path)

    docker_engine.images.build(path=extraction_path, tag=image_name)


def remove_image(imageName, force=True):
    __remove_image(imageName, force)


def run_image(imageName, command, ports, detach=True, tty=True):
    __run_image(imageName, command, ports, detach, tty)


def stop_container(containerName):
    __stop_container(containerName)


def pause_container(containerName):
    __pause_container(containerName)


def unpause_container(containerName):
    __unpause_container(containerName)


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
                "containerPorts": x.attrs["HostConfig"]["PortBindings"],
                "containerStatus": x.status,
            },
            containers,
        )
    )


def __get_container_logs(containerName):
    container = docker_engine.containers.get(containerName)
    container_logs = container.logs().decode()
    return container_logs


def __pull_image(repository):
    docker_engine.images.pull(repository)


def __remove_image(imageName, force):
    docker_engine.images.remove(imageName, force=force)


def __run_image(imageName, command, ports, detach, tty):
    docker_engine.containers.run(
        imageName, command, ports=ports, detach=detach, tty=tty
    )


def __stop_container(containerName):
    containers = docker_engine.containers.list()
    for container in containers:
        if container.name == containerName:
            container.stop()
            return True
    return False


def __pause_container(containerName):
    containers = docker_engine.containers.list()
    for container in containers:
        if container.name == containerName:
            container.pause()
            return True
    return False


def __unpause_container(containerName):
    containers = docker_engine.containers.list()
    for container in containers:
        if container.name == containerName:
            container.unpause()
            return True
    return False
