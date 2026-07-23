export default function BillingPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Billing & Subscriptions</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm font-medium">Annual Recurring Revenue (ARR)</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">$2.4M</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm font-medium">Active Subscriptions</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">1,850</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Gateways Status</h3>
        <ul className="space-y-3">
          <li className="flex justify-between items-center">
            <span className="font-medium text-gray-700">Stripe</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Operational</span>
          </li>
          <li className="flex justify-between items-center">
            <span className="font-medium text-gray-700">PayPal</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Operational</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
