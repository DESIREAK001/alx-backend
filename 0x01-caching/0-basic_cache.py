#!/usr/bin/python3
""" BasicCache module
"""
BaseCaching = __import__('base_caching').BaseCaching


class BasicCache(BaseCaching):
    """ BasicCache inheretes from BaseCaching
        and over rides
      - get wich was not implemented
      - put wich was not implemented
    """
    def __init__(self):
        """ Initiliaze
        """
        super().__init__()

    def put(self, key, item):
        """ Add an item in the cache
        """
        if not key or not item:
            return
        self.cache_data.update({key: item})

    def get(self, key):
        """ Get an item by key
        """
        return self.cache_data.get(key)
