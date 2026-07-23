export default function MonitoringPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">System Health Monitoring</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm font-medium">API Latency (avg)</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">45ms</p>
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '15%' }}></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm font-medium">Redis Cache Hit Rate</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">92%</p>
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }}></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm font-medium">Database Pool Health</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">68% Utilized</p>
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '68%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
