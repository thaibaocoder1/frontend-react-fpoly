import { Box, Chip } from "@mui/material";
import PropTypes from "prop-types";

const FILTER_LIST = [
  {
    id: 1,
    getLabel: (filters) => `From ${filters._minPrice} to ${filters._maxPrice}`,
    isActive: () => true,
    isVisible: (filters) =>
      Object.keys(filters).includes("_minPrice") &&
      filters._minPrice !== "" &&
      Object.keys(filters).includes("_maxPrice") &&
      filters._maxPrice !== "",
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters._minPrice;
      delete newFilters._maxPrice;
      return newFilters;
    },
    onToggle: null,
  },
  {
    id: 2,
    getLabel: (filters) => `${filters._category}`,
    isActive: () => true,
    isVisible: (filters) =>
      Object.keys(filters).includes("_category") && filters._category !== "",
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters._category;
      return newFilters;
    },
    onToggle: null,
  },
  {
    id: 3,
    getLabel: (filters) => `${filters._rating} Star`,
    isActive: () => true,
    isVisible: (filters) =>
      Object.keys(filters).includes("_rating") && filters._rating,
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters._rating;
      return newFilters;
    },
    onToggle: null,
  },
];
const FilterViews = ({ filters, onChange }) => {
  return (
    <Box component={"ul"} my={2} sx={{ display: "flex", gap: 1 }}>
      {FILTER_LIST.filter((x) => x.isVisible(filters)).map((x) => (
        <li key={x.id}>
          <Chip
            label={x.getLabel(filters)}
            color={x.isActive(filters) ? "primary" : "default"}
            clickable={x.isRemovable}
            onClick={
              x.isRemovable
                ? null
                : () => {
                    if (!onChange) return;
                    const newFilters = x.onChange(filters);
                    onChange(newFilters);
                  }
            }
            onDelete={
              x.isRemovable
                ? () => {
                    if (!onChange) return;
                    const newFilters = x.onRemove(filters);
                    onChange(newFilters);
                  }
                : null
            }
          />
        </li>
      ))}
    </Box>
  );
};
FilterViews.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

export default FilterViews;
