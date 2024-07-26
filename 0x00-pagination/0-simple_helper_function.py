#!/usr/bin/env python3
"""
0-simple_helper_function
"""
from typing import Tuple


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
