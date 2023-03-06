import uuid


def uuid_to_str():
    """
    Convert a uuid object to string removing the hyphens"""
    _uuid_str = str(uuid.uuid4())
    return uuid.UUID(_uuid_str).hex