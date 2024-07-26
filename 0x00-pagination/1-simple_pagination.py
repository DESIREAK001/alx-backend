#!/usr/bin/env python3
'''
1-simple_pagination
'''
import csv
from typing import List, Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    '''
    Returns the start and end index based on the page number and page size.

    Parameters:
    page (int): The page number.
    page_size (int): The number of items per page.

    Returns:
    Tuple[int, int]: A tuple containing the start index (inclusive)
    and the end index (exclusive).
    '''
    start_index: int = (page - 1) * page_size
    return (start_index, start_index + page_size)


class Server:
    """
    Server class to paginate a database of popular baby names.
    """

    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        '''
        Gets the range of data if possible, if not, returns an empty list.

        Parameters:
        page (int): The page number.
        page_size (int): The number of items per page.

        Returns:
        List[List]: A list of lists representing the data for the requested
        page within the specified page size.
        '''
        assert type(page) is int and type(page_size) is int
        assert page > 0 and page_size > 0
        start_index, end_index = index_range(page, page_size)
        book: List[List] = self.dataset()
        if start_index >= len(book):
            return []
        return book[start_index: end_index]
