import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), {
  ssr: false,
});

export default function Docs() {
  return (
    <div className="min-h-screen bg-slate-800 text-slate-100 px-8 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            API Documentation
          </h1>
          <p className="text-slate-400 mt-2">
            Financial Management System – OpenAPI Specification
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900 p-6">
          <SwaggerUI
            url="/api/docs/docs"
            docExpansion="list"
            defaultModelsExpandDepth={-1}
          />
        </div>
      </div>
    </div>
  );
}