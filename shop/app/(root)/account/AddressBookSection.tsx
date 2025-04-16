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
    fetchAddresses();
  };

  const handleDelete = async (index: number) => {
    await fetch("/api/addresses", {
      method: "DELETE",
      body: JSON.stringify({ index }),
    });
    fetchAddresses();
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
    fetchAddresses();
  };

  if (loading) return <p className="text-gray-400">Loading addresses...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-[Pacifico] text-purple-1">Address Book</h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-purple-1 text-white px-6 py-2 rounded hover:bg-purple-2 transition"
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
          <input
            className="border p-2 rounded"
            placeholder="Full Name"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            required
          />
          <input
            className="border p-2 rounded"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <input
            className="border p-2 rounded"
            placeholder="Street"
            value={form.street}
            onChange={(e) => setForm({ ...form, street: e.target.value })}
            required
          />
          <input
            className="border p-2 rounded"
            placeholder="City"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            required
          />
          <input
            className="border p-2 rounded"
            placeholder="State"
            value={form.state}
            onChange={(e) => setForm({ ...form, state: e.target.value })}
            required
          />
          <input
            className="border p-2 rounded"
            placeholder="Zip Code"
            value={form.zipCode}
            onChange={(e) => setForm({ ...form, zipCode: e.target.value })}
          />
          <input
            className="border p-2 rounded"
            placeholder="Country"
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
            required
          />
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
              className="bg-purple-1 text-white py-2 px-6 rounded hover:bg-purple-2 transition"
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
              className={`border rounded-lg p-6 bg-white shadow-sm relative ${
                address.isDefault ? "border-purple-500" : ""
              }`}
            >
              <h3 className="text-sm font-semibold uppercase mb-4 tracking-wider text-purple-1">
                {address.isDefault ? "Default Address" : `Address ${index + 1}`}
              </h3>

              {editingIndex === index ? (
                <form
                  onSubmit={handleEditSubmit}
                  className="space-y-2 text-sm text-gray-800 mb-4"
                >
                  <input
                    className="w-full border p-1 rounded"
                    value={editForm.fullName}
                    onChange={(e) =>
                      setEditForm({ ...editForm, fullName: e.target.value })
                    }
                  />
                  <input
                    className="w-full border p-1 rounded"
                    value={editForm.phone}
                    onChange={(e) =>
                      setEditForm({ ...editForm, phone: e.target.value })
                    }
                  />
                  <input
                    className="w-full border p-1 rounded"
                    value={editForm.street}
                    onChange={(e) =>
                      setEditForm({ ...editForm, street: e.target.value })
                    }
                  />
                  <input
                    className="w-full border p-1 rounded"
                    value={editForm.city}
                    onChange={(e) =>
                      setEditForm({ ...editForm, city: e.target.value })
                    }
                  />
                  <input
                    className="w-full border p-1 rounded"
                    value={editForm.state}
                    onChange={(e) =>
                      setEditForm({ ...editForm, state: e.target.value })
                    }
                  />
                  <input
                    className="w-full border p-1 rounded"
                    value={editForm.zipCode}
                    onChange={(e) =>
                      setEditForm({ ...editForm, zipCode: e.target.value })
                    }
                  />
                  <input
                    className="w-full border p-1 rounded"
                    value={editForm.country}
                    onChange={(e) =>
                      setEditForm({ ...editForm, country: e.target.value })
                    }
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="border border-purple-1 px-4 py-1 rounded hover:bg-purple-1 hover:text-white"
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
                  <div className="space-y-1 text-[16px] text-gray-800 mb-4">
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
                        className="text-sm border border-purple-1 px-4 py-1 rounded hover:bg-purple-1 hover:text-white"
                      >
                        Set as Default
                      </button>
                    )}
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-sm border border-blue-400 px-4 py-1 rounded hover:bg-blue-500 hover:text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-sm border border-red-400 px-4 py-1 rounded hover:bg-red-500 hover:text-white"
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
