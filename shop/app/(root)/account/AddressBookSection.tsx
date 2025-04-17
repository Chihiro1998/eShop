"use client";

import { useEffect, useState } from "react";

interface Address {
  fullName: string;
  phone?: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
}

const initialForm: Address = {
  fullName: "",
  phone: "",
  street: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
  isDefault: false,
};

const AddressBookSection = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Address>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Address>(initialForm);
  const [showForm, setShowForm] = useState(false);

  const fetchAddresses = async () => {
    try {
      const res = await fetch("/api/addresses");
      const data = await res.json();
      if (res.ok) setAddresses(data);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/addresses", {
        method: "POST",
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setForm(initialForm);
        setShowForm(false);
        await fetchAddresses();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const setAsDefault = async (index: number) => {
    await fetch("/api/addresses", {
      method: "PATCH",
      body: JSON.stringify({ index, setDefault: true }),
    });
    await fetchAddresses();
  };

  const handleDelete = async (index: number) => {
    await fetch("/api/addresses", {
      method: "DELETE",
      body: JSON.stringify({ index }),
    });
    await fetchAddresses();
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditForm(addresses[index]);
  };

  const handleEditSubmit = async (e: any) => {
    e.preventDefault();
    await fetch("/api/addresses", {
      method: "PATCH",
      body: JSON.stringify({ index: editingIndex, data: editForm }),
    });
    setEditingIndex(null);
    await fetchAddresses();
  };

  if (loading) return <p className="text-gray-400">Loading addresses...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-[Pacifico] text-purple-1">Address Book</h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-purple-3 text-white px-6 py-2 rounded hover:bg-purple-2 transition"
          >
            Add Address
          </button>
        )}
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded shadow"
        >
          {[
            "Full Name",
            "Phone",
            "Street",
            "City",
            "State",
            "Zip Code",
            "Country",
          ].map((label) => {
            const key =
              label.replace(" ", "").charAt(0).toLowerCase() +
              label.replace(" ", "").slice(1);
            return (
              <input
                key={label}
                className="border p-2 rounded"
                placeholder={label}
                value={form[key as keyof Address] as string}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                required={[
                  "Full Name",
                  "Street",
                  "City",
                  "State",
                  "Country",
                ].includes(label)}
              />
            );
          })}
          <label className="flex items-center gap-2 text-sm col-span-2">
            <input
              type="checkbox"
              checked={form.isDefault}
              onChange={(e) =>
                setForm({ ...form, isDefault: e.target.checked })
              }
            />
            Set as default address
          </label>
          <div className="col-span-2 flex gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="bg-purple-3 text-white py-2 px-6 rounded hover:bg-purple-2 transition"
            >
              {submitting ? "Saving..." : "Save Address"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setForm(initialForm);
              }}
              className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {addresses.length === 0 ? (
        <p className="text-gray-400 mt-4">
          You have not added any addresses yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address, index) => (
            <div
              key={index}
              className={`rounded-lg p-6 shadow-sm relative transition border ${
                address.isDefault
                  ? "bg-purple-1 text-white border-purple-1"
                  : "bg-white text-purple-1 border-purple-1"
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider">
                  {address.isDefault
                    ? "Default Address"
                    : `Address ${index + 1}`}
                </h3>
                {address.isDefault && (
                  <span className="text-xs bg-white text-purple-1 px-2 py-0.5 rounded-full flex items-center gap-1">
                    ✅ Default
                  </span>
                )}
              </div>

              {editingIndex === index ? (
                <form
                  onSubmit={handleEditSubmit}
                  className="space-y-2 text-sm mb-4"
                >
                  {Object.entries(editForm).map(([key, value]) =>
                    key === "isDefault" ? null : (
                      <input
                        key={key}
                        className="w-full border p-1 rounded"
                        value={value || ""}
                        onChange={(e) =>
                          setEditForm({ ...editForm, [key]: e.target.value })
                        }
                      />
                    )
                  )}
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="border border-white bg-purple-1 text-white px-4 py-1 rounded hover:bg-purple-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingIndex(null)}
                      type="button"
                      className="border border-gray-400 px-4 py-1 rounded hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="space-y-1 text-sm mb-4">
                    <p>{address.fullName}</p>
                    {address.phone && <p>{address.phone}</p>}
                    <p>{address.street}</p>
                    <p>
                      {address.city}, {address.state}
                    </p>
                    <p>
                      {address.country}{" "}
                      {address.zipCode && `, ${address.zipCode}`}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {!address.isDefault && (
                      <button
                        onClick={() => setAsDefault(index)}
                        className="text-sm border border-purple-1 text-purple-1 px-4 py-1 rounded hover:bg-purple-1 hover:text-white"
                      >
                        Set as Default
                      </button>
                    )}
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-sm border border-purple-1 text-purple-1 px-4 py-1 rounded hover:bg-purple-1 hover:text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-sm border border-purple-1 text-purple-1 px-4 py-1 rounded hover:bg-purple-1 hover:text-white"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressBookSection;
