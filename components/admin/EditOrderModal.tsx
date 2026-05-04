"use client";

import { useState } from "react";
import { X, Save } from "lucide-react";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Props = {
  open: boolean;
  order: any;
  onClose: () => void;
  onUpdated: () => void;
};

export default function EditOrderModal({ open, order, onClose, onUpdated }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open || !order) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);

    try {
      const orderRef = doc(db, "orders", order.id);

      await updateDoc(orderRef, {
        priority: form.get("priority"),
        fragile: form.get("fragile") === "on",
        insured: form.get("insured") === "on",
        insuranceAmount: Number(form.get("insuranceAmount")) || 0,

        payment: {
          ...order.payment,
          method: form.get("paymentMethod"),
          currency: form.get("currency"),
          amount: Number(form.get("amount")),
        },

        pickupSchedule: {
          date: form.get("pickupDate"),
          time: form.get("pickupTime"),
          instructions: form.get("pickupInstructions"),
        },

        deliverySchedule: {
          date: form.get("deliveryDate"),
          time: form.get("deliveryTime"),
          instructions: form.get("deliveryInstructions"),
          signatureRequired: form.get("signatureRequired") === "on",
        },

        pickup: {
          name: form.get("pickupName"),
          phone: form.get("pickupPhone"),
          email: form.get("pickupEmail"),
          address: form.get("pickupAddress"),
          city: form.get("pickupCity"),
          country: form.get("pickupCountry"),
        },

        recipient: {
          name: form.get("recipientName"),
          phone: form.get("recipientPhone"),
          email: form.get("recipientEmail"),
          address: form.get("recipientAddress"),
          city: form.get("recipientCity"),
          country: form.get("recipientCountry"),
        },

        package: {
          goodsName: form.get("goodsName"),
          description: form.get("packageDescription"),
          category: form.get("packageCategory"),
          weight: Number(form.get("packageWeight")),
          length: Number(form.get("packageLength")),
          width: Number(form.get("packageWidth")),
          height: Number(form.get("packageHeight")),
          value: Number(form.get("packageValue")),
          hazardous: form.get("hazardous") === "on",
        },

        notes: form.get("notes"),
        updatedAt: serverTimestamp(),
      });

      onUpdated();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to update order");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-xl overflow-hidden">
        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Save className="w-5 h-5 text-blue-500" />
            Edit Order: {order.trackingNumber}
          </h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500 hover:text-black" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-10 overflow-y-auto max-h-[75vh]">
          {error && <div className="bg-red-50 text-red-600 p-3 rounded">{error}</div>}

          <Section title="Order Settings">
            <Select name="priority" label="Priority" options={["Normal", "High", "Urgent"]} defaultValue={order.priority} />
            <Checkbox name="fragile" label="Fragile" defaultChecked={order.fragile} />
            <Checkbox name="insured" label="Insured" defaultChecked={order.insured} />
            <Input name="insuranceAmount" label="Insurance Amount" type="number" defaultValue={order.insuranceAmount} />
          </Section>

          <Section title="Payment">
            <Select name="paymentMethod" label="Payment Method" options={["Card", "Transfer", "Cash", "Crypto"]} defaultValue={order.payment?.method} />
            <Select name="currency" label="Currency" options={["USD", "EUR", "GBP"]} defaultValue={order.payment?.currency} />
            <Input name="amount" label="Total Amount" type="number" defaultValue={order.payment?.amount} />
          </Section>

          <Section title="Pickup Schedule">
            <Input name="pickupDate" label="Pickup Date" type="date" defaultValue={order.pickupSchedule?.date} />
            <Input name="pickupTime" label="Pickup Time" type="time" defaultValue={order.pickupSchedule?.time} />
            <Input name="pickupInstructions" label="Pickup Instructions" defaultValue={order.pickupSchedule?.instructions} />
          </Section>

          <Section title="Delivery Schedule">
            <Input name="deliveryDate" label="Delivery Date" type="date" defaultValue={order.deliverySchedule?.date} />
            <Input name="deliveryTime" label="Delivery Time" type="time" defaultValue={order.deliverySchedule?.time} />
            <Input name="deliveryInstructions" label="Delivery Instructions" defaultValue={order.deliverySchedule?.instructions} />
            <Checkbox name="signatureRequired" label="Signature Required" defaultChecked={order.deliverySchedule?.signatureRequired} />
          </Section>

          <Section title="Sender (Pickup)">
            <Input name="pickupName" label="Name" defaultValue={order.pickup?.name} />
            <Input name="pickupPhone" label="Phone" defaultValue={order.pickup?.phone} />
            <Input name="pickupEmail" label="Email" defaultValue={order.pickup?.email} />
            <Input name="pickupAddress" label="Address" defaultValue={order.pickup?.address} />
            <Input name="pickupCity" label="City" defaultValue={order.pickup?.city} />
            <Input name="pickupCountry" label="Country" defaultValue={order.pickup?.country} />
          </Section>

          <Section title="Receiver">
            <Input name="recipientName" label="Name" defaultValue={order.recipient?.name} />
            <Input name="recipientPhone" label="Phone" defaultValue={order.recipient?.phone} />
            <Input name="recipientEmail" label="Email" defaultValue={order.recipient?.email} />
            <Input name="recipientAddress" label="Address" defaultValue={order.recipient?.address} />
            <Input name="recipientCity" label="City" defaultValue={order.recipient?.city} />
            <Input name="recipientCountry" label="Country" defaultValue={order.recipient?.country} />
          </Section>

          <Section title="Package Details">
            <Input name="goodsName" label="Goods Name" defaultValue={order.package?.goodsName} />
            <Input name="packageDescription" label="Description" defaultValue={order.package?.description} />
            <Input name="packageCategory" label="Category" defaultValue={order.package?.category} />
            <Input name="packageWeight" label="Weight (kg)" type="number" defaultValue={order.package?.weight} />
            <Input name="packageLength" label="Length (cm)" type="number" defaultValue={order.package?.length} />
            <Input name="packageWidth" label="Width (cm)" type="number" defaultValue={order.package?.width} />
            <Input name="packageHeight" label="Height (cm)" type="number" defaultValue={order.package?.height} />
            <Input name="packageValue" label="Declared Value" type="number" defaultValue={order.package?.value} />
            <Checkbox name="hazardous" label="Hazardous Material" defaultChecked={order.package?.hazardous} />
          </Section>

          <Section title="Additional Notes">
            <textarea
              name="notes"
              defaultValue={order.notes}
              className="border rounded-lg p-3 w-full h-24 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </Section>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button type="button" onClick={onClose} className="px-5 py-2 rounded-lg border">Cancel</button>
            <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-lg">
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------------- UPDATED UI HELPERS ---------------- */

function Section({ title, children }: any) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

function Input({ label, name, type = "text", defaultValue }: any) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600">{label}</label>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
      />
    </div>
  );
}

function Select({ label, name, options, defaultValue }: any) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600">{label}</label>
      <select
        name={name}
        defaultValue={defaultValue}
        className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
      >
        <option value="">Select</option>
        {options.map((o: string) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function Checkbox({ name, label, defaultChecked }: any) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="accent-blue-500" />
      {label}
    </label>
  );
}