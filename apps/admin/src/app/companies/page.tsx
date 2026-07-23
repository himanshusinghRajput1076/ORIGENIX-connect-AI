export default function CompaniesPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Company & Startup Moderation</h2>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Pending Approvals</h3>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
              <div>
                <h4 className="font-semibold text-gray-800">Startup Alpha {i}</h4>
                <p className="text-sm text-gray-500">Tech Industry • Founded 2023</p>
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Approve</button>
                <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Reject</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
