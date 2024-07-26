#!/usr/bin/python3
""" LFUCache module
"""
BaseCaching = __import__('base_caching').BaseCaching


class LFUCache(BaseCaching):
    """ LFUCache inheretes from BaseCaching
        and over rides
      - get wich was not implemented
      - put wich was not implemented
    """
    def __init__(self):
        """ Initiliaze
        """
        super().__init__()
        self.__data = {}

    def __get_freq_rec(self, key):
        ''' gets the frequency and recently to asign'''
        if len(self.__data) == 0:
            rec = 0
        else:
            rec = max(self.__data, key=lambda k: self.__data[k]['rec'])
            rec = self.__data[rec]['rec'] + 1
        freq = self.__data[key]['freq'] + 1 if key in self.__data else 0
        return {'freq': freq, 'rec': rec}

    def __key_to_remove(self):
        '''
            gets the key to remove first by
            least frequency used if two items
            have the same number then by
            least recently used
        '''
        key = min(self.__data, key=lambda k: self.__data[k]['freq'])
        value = self.__data[key]['freq']
        keys = [k for k in self.__data if self.__data[k]['freq'] == value]
        if len(keys) == 1:
            return keys[0]
        return min(keys, key=lambda k: self.__data[k]['rec'])

    def put(self, key, item):
        """
            Add an item in the cache
            if the cache containes more then
            the allowed lenght removes
            the least frequency used item
            if two items have the same number
            the least recently used item is removed
        """
        if not key or not item:
            return
        self.cache_data.update({key: item})

        if len(self.cache_data) > self.MAX_ITEMS:
            key_to_remove = self.__key_to_remove()
            self.__data.pop(key_to_remove)
            self.cache_data.pop(key_to_remove)
            print('DISCARD: {}'.format(key_to_remove))

        self.__data.update({key: self.__get_freq_rec(key)})

    def get(self, key):
        """ Get an item by key
        """
        if key in self.__data:
            self.__data.update({key: self.__get_freq_rec(key)})
        return self.cache_data.get(key)
