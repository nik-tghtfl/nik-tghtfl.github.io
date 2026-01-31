import Link from "next/link";

export default function FeedbackPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">Submit Feedback</h1>
        <p className="text-lg text-gray-600">
          The feedback form will go here.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="text-indigo-600 hover:text-indigo-700 hover:underline text-sm font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
