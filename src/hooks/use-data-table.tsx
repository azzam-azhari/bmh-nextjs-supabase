import { useState } from 'react';
import useDebounce from './use-debounce';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10; // Sesuaikan dengan kebutuhan

export default function useDataTable() {
    const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
    const [currentLimit, setCurrentLimit] = useState(DEFAULT_LIMIT);
    const [currentSearch, setCurrentSearch] = useState('');
    const debounce = useDebounce();

    const handleChangePage = (page: number) => {
        setCurrentPage(page);
    };

    const handleChangeLimit = (limit: number) => {
        setCurrentLimit(limit);
        setCurrentPage(DEFAULT_PAGE);
    };

    const handleChangeSearch = (search: string) => {
        debounce(() => {
            setCurrentSearch(search);
            setCurrentPage(DEFAULT_PAGE); // Reset ke halaman 1 saat mencari
        }, 300); // Delay 300ms agar lebih responsif
    };

    return {
        currentPage,
        currentLimit,
        currentSearch,
        handleChangePage,
        handleChangeLimit,
        handleChangeSearch,
    };
}