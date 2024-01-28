#!/usr/bin/env python3
"""Pagination project"""

from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """Function to return tuple of size two"""
    if page > 0 or page_size > 0:
        start_index = (page - 1) * page_size
        end_index = start_index + page_size
        return start_index, end_index
