#!/usr/bin/python3
""" LIFOCache module
"""
BaseCaching = __import__('base_caching').BaseCaching


class LIFOCache(BaseCaching):
    """ LIFOCache inheretes from BaseCaching
        and over rides
      - get wich was not implemented
      - put wich was not implemented
    """
    def __init__(self):
        """ Initiliaze
        """
        super().__init__()
        self.__stack = []

    def put(self, key, item):
        """ Add an item in the cache
            if the cache containes more then
            the allowed lenght remover
            the last elemnt added or updated
        """
        if not key or not item:
            return
        if key in self.__stack:
            self.__stack.remove(key)
        if len(self.__stack) == self.MAX_ITEMS:
            self.cache_data.pop(self.__stack[-1])
            print('DISCARD: {}'.format(self.__stack.pop()))
        self.__stack.append(key)
        self.cache_data.update({key: item})

    def get(self, key):
        """ Get an item by key
        """
        return self.cache_data.get(key)
