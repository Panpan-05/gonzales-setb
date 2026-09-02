import { useState } from "react";
import styles from "./App.module.css";

function App() {
  const [formData, setFormData] = useState({
    itemName: "",
    bodyType: "",
    genre: "",
    brand: "",
    stock: "",
    company: "",
    role: "",
  });

  const [errors, setErrors] = useState({});

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

    if (formData.brand.trim() === "") {
      newErrors.brand = "Brand or artist is required.";
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
      alert("Guitar successfully registered!");

      console.log("Submitted Guitar:", formData);
    }
  };

  const handleClear = () => {
    setFormData({
      itemName: "",
      bodyType: "",
      genre: "",
      brand: "",
      stock: "",
      company: "",
      role: "",
    });

    setErrors({});
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>
            Guitar Store Inventory Manager
          </h1>

          <p className={styles.subtitle}>
            Register a guitar item into the inventory
          </p>

          <form onSubmit={handleSubmit}>
            {/* Guitar Model */}
            <div className={styles.formGroup}>
              <label htmlFor="itemName">
                Guitar Model / Item Name
              </label>

              <input
                id="itemName"
                type="text"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
                placeholder="e.g. Fender Stratocaster"
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

            {/* Body Type */}
            <div className={styles.formGroup}>
              <label htmlFor="bodyType">
                Body Type
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
                  Select body type
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

            {/* Genre */}
            <div className={styles.formGroup}>
              <label htmlFor="genre">
                Sub-category / Genre
              </label>

              <input
                id="genre"
                type="text"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                placeholder="e.g. Rock"
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

            {/* Brand */}
            <div className={styles.formGroup}>
              <label htmlFor="brand">
                Brand / Artist
              </label>

              <input
                id="brand"
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="e.g. Fender"
                className={
                  errors.brand
                    ? styles.inputError
                    : styles.input
                }
              />

              {errors.brand && (
                <span className={styles.error}>
                  {errors.brand}
                </span>
              )}
            </div>

            {/* Stock */}
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

            {/* Manufacturer */}
            <div className={styles.formGroup}>
              <label htmlFor="company">
                Manufacturer / Company Name
              </label>

              <input
                id="company"
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. Fender Musical Instruments"
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

            {/* User Role */}
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

            {/* Buttons */}
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
      </div>
    </div>
  );
}

export default App;