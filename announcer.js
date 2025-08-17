function loadAnnouncerContent(content) {
    content.innerHTML = `
        <div class="space-y-6">
            <div class="bg-white p-6 rounded-lg shadow-sm">
                <h2 class="text-xl font-semibold mb-4">Announcer Dashboard</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button onclick="showPendingResults()" class="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700">
                        Pending Results
                    </button>
                    <button onclick="showPublishResults()" class="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700">
                        Publish Results
                    </button>
                </div>
            </div>
            <div id="announcerContent"></div>
        </div>
    `;
}

async function showPendingResults() {
    // Implementation for showing pending results to announce
}

async function showPublishResults() {
    // Implementation for publishing results
}
