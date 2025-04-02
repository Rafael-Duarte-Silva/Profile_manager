import "./SearchBar.scss";

import { IconSearch } from "@/components/icons/IconSearch";
import { Button } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";

import { useTableContext } from "../../context/TableContext";

export const SearchBar = () => {
    const { handleSarchKeyboard, handleSearch, search, setSearch } =
        useTableContext();

    return (
        <Button
            asChild
            size="maxMd"
            type="button"
            variant="text"
            onKeyDown={handleSarchKeyboard}
        >
            <label>
                <IconSearch onClick={() => handleSearch()} />
                <Typography
                    asChild
                    variant="second"
                    colors="Medium"
                    className="SearchBar-input"
                >
                    <input
                        type="search"
                        placeholder="Search"
                        onChange={(e) =>
                            setSearch({
                                ...search,
                                value: e.target.value,
                            })
                        }
                        value={search.value}
                    />
                </Typography>
            </label>
        </Button>
    );
};
