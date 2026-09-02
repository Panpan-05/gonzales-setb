import { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import styles from "./App.module.css";

function App() {
  const [formData, setFormData] = useState({
    itemName: "",
    bodyType: "",
    genre: "",
    stock: "",
    company: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [guitars, setGuitars] = useState([]);

  const [selectedGuitar, setSelectedGuitar] = useState(null);
  const [activeGuitar, setActiveGuitar] = useState(null);
  const [showMerchantOnly, setShowMerchantOnly] = useState(false);

  useEffect(() => {
    if (selectedGuitar) {
      setActiveGuitar(selectedGuitar);
    }
  }, [selectedGuitar]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.itemName.trim() === "") {
      newErrors.itemName = "Guitar model is required.";
    } else if (formData.itemName.trim().length < 3) {
      newErrors.itemName =
        "Guitar model must be at least 3 characters.";
    }

    if (formData.bodyType === "") {
      newErrors.bodyType = "Please select a body type.";
    }

    if (formData.genre.trim() === "") {
      newErrors.genre = "Genre is required.";
    }

    if (formData.stock === "") {
      newErrors.stock = "Stock quantity is required.";
    } else if (
      Number(formData.stock) < 1 ||
      Number(formData.stock) > 100
    ) {
      newErrors.stock =
        "Stock quantity must be between 1 and 100.";
    }

    if (formData.company.trim() === "") {
      newErrors.company =
        "Manufacturer/company name is required.";
    }

    if (formData.role === "") {
      newErrors.role = "Please select a user role.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      const newGuitar = {
        ...formData,
        id: Date.now(),
      };

      setGuitars((currentGuitars) => [
        ...currentGuitars,
        newGuitar,
      ]);

      alert("Guitar successfully registered!");

      console.log("Submitted Guitar:", newGuitar);

      handleClear();
    }
  };

  const handleClear = () => {
    setFormData({
      itemName: "",
      bodyType: "",
      genre: "",
      stock: "",
      company: "",
      role: "",
    });

    setErrors({});
  };

  const filteredGuitars = showMerchantOnly
    ? guitars.filter((guitar) => guitar.role === "Merchant")
    : guitars;

  const columns = [
    {
      accessorKey: "itemName",
      header: "Guitar Name",
    },
    {
      accessorKey: "bodyType",
      header: "Guitar Type",
    },
    {
      accessorKey: "genre",
      header: "Genre",
    },
    {
      accessorKey: "stock",
      header: "Stock",
    },
    {
      accessorKey: "company",
      header: "Manufacturer",
    },
    {
      accessorKey: "role",
      header: "User Role",
    },
  ];

  const table = useReactTable({
    data: filteredGuitars,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    autoResetPageIndex: false,

    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        <div className={styles.card}>
          <h1 className={styles.title}>
            Guitar Inventory Management
          </h1>

          <p className={styles.subtitle}>
            Register an item into the inventory
          </p>

          <form onSubmit={handleSubmit}>

            <div className={styles.formGroup}>
              <label htmlFor="itemName">
                Guitar Name
              </label>

              <input
                id="itemName"
                type="text"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
                placeholder="Enter Guitar Name"
                className={
                  errors.itemName
                    ? styles.inputError
                    : styles.input
                }
              />

              {errors.itemName && (
                <span className={styles.error}>
                  {errors.itemName}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="bodyType">
                Guitar Type
              </label>

              <select
                id="bodyType"
                name="bodyType"
                value={formData.bodyType}
                onChange={handleChange}
                className={
                  errors.bodyType
                    ? styles.inputError
                    : styles.input
                }
              >
                <option value="">
                  Select guitar type
                </option>

                <option value="Electric">
                  Electric
                </option>

                <option value="Acoustic">
                  Acoustic
                </option>

                <option value="Bass">
                  Bass
                </option>

                <option value="Classical">
                  Classical
                </option>
              </select>

              {errors.bodyType && (
                <span className={styles.error}>
                  {errors.bodyType}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="genre">
                Genre
              </label>

              <input
                id="genre"
                type="text"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                placeholder="Enter Genre"
                className={
                  errors.genre
                    ? styles.inputError
                    : styles.input
                }
              />

              {errors.genre && (
                <span className={styles.error}>
                  {errors.genre}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="stock">
                Stock Quantity
              </label>

              <input
                id="stock"
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="1"
                max="100"
                placeholder="1 - 100"
                className={
                  errors.stock
                    ? styles.inputError
                    : styles.input
                }
              />

              {errors.stock && (
                <span className={styles.error}>
                  {errors.stock}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="company">
                Manufacturer
              </label>

              <input
                id="company"
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Enter Brand Name"
                className={
                  errors.company
                    ? styles.inputError
                    : styles.input
                }
              />

              {errors.company && (
                <span className={styles.error}>
                  {errors.company}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>User Role</label>

              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="role"
                    value="Merchant"
                    checked={formData.role === "Merchant"}
                    onChange={handleChange}
                  />

                  Merchant
                </label>

                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="role"
                    value="Consumer"
                    checked={formData.role === "Consumer"}
                    onChange={handleChange}
                  />

                  Consumer
                </label>
              </div>

              {errors.role && (
                <span className={styles.error}>
                  {errors.role}
                </span>
              )}
            </div>

            <div className={styles.buttonGroup}>
              <button
                type="submit"
                className={styles.submitButton}
              >
                Register Guitar
              </button>

              <button
                type="button"
                className={styles.clearButton}
                onClick={handleClear}
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        <div className={styles.card}>
          <h2 className={styles.tableTitle}>
            Available Inventory
            <div className={styles.filterContainer}>
              <button
                type="button"
                onClick={() => setShowMerchantOnly(!showMerchantOnly)}
                className={styles.filterButton}
              >
                {showMerchantOnly ? "Show All" : "Show Merchant Only"}
              </button>
            </div>
          </h2>

          {guitars.length === 0 ? (
            <p className={styles.emptyMessage}>
              No items registered yet.
            </p>
          ) : (
            <>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th key={header.id}>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>

                  <tbody>
                    {table.getRowModel().rows.map((row) => (
                      <tr
                        key={row.id}
                        onClick={() => setSelectedGuitar(row.original)}
                        className={
                          activeGuitar && activeGuitar.id === row.original.id
                            ? styles.selectedRow
                            : ""
                        }
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className={styles.pagination}>
                <button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className={styles.pageButton}
                >
                  Previous
                </button>

                <span className={styles.pageInfo}>
                  Page{" "}
                  {table.getState().pagination.pageIndex + 1}{" "}
                  of {table.getPageCount()}
                </span>

                <button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className={styles.pageButton}
                >
                  Next
                </button>
              </div>
            </>
          )}

        </div>
        {activeGuitar && (
          <div className={styles.card}>
            <h2 className={styles.tableTitle}>
              Active Guitar Details
            </h2>

            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>
                  Guitar Model
                </span>

                <span className={styles.detailValue}>
                  {activeGuitar.itemName}
                </span>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>
                  Guitar Type
                </span>

                <span className={styles.detailValue}>
                  {activeGuitar.bodyType}
                </span>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>
                  Genre
                </span>

                <span className={styles.detailValue}>
                  {activeGuitar.genre}
                </span>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>
                  Stock Quantity
                </span>

                <span className={styles.detailValue}>
                  {activeGuitar.stock}
                </span>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>
                  Manufacturer
                </span>

                <span className={styles.detailValue}>
                  {activeGuitar.company}
                </span>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>
                  User Role
                </span>

                <span
                  className={
                    activeGuitar.role === "Merchant"
                      ? styles.merchantBadge
                      : styles.consumerBadge
                  }
                >
                  {activeGuitar.role}
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;