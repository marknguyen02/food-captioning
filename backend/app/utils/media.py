import os


def generate_save_path(media_url):
    return '/home/marknguyen/VSCodeProjects/vs-cap-app/images' + media_url


def generate_display_path(media_url):
    return 'http://127.0.0.1:8080/' + media_url


def convert_to_db_url(media_url: str) -> str:
    index = media_url.find('/users')
    if index != -1:
        return media_url[index:]
    return ''