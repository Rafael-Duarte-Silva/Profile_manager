import "./SearchBar.scss";

import { IconSearch } from "@/components/icons/IconSearch";
import { Button } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";

export const SearchBar = () => {
    return (
        <Button
            asChild
            size="maxMd"
            type="button"
            variant="text"
        >
            <label>
                <IconSearch />
                <Typography
                    asChild
                    variant="second"
                    colors="Medium"
                    className="SearchBar-input"
                >
                    <input
                        type="search"
                        placeholder="Search"
                    />
                </Typography>
            </label>
        </Button>
    );
};

