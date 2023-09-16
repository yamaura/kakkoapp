import { FormEventHandler } from "react";

export default function Form(props) {
  const handleSubmit = (e: FormEventHandler<HTMLFormElement>) => {
    e.preventDefault();
    const t = e.target as any;
    props.onSubmit({
      lines: parseInt(t.lines.value),
      text: t.text.value,
      options: { do_sample: true, num_return_sequences: 1, temperature: parseFloat(t.temperature.value) },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Initial Sequence
          </label>
        </div>
        <div className="flex w-full px-3">
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded mr-3 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            name="text"
            defaultValue=""
            placeholder="(())"
          />
          {props.submittable
            ? (
              <button
                className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-3 px-2 rounded"
                type="submit"
              >
                Run
              </button>
            )
            : ""}
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Rendering Lines
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="number"
            name="lines"
            defaultValue="5"
          />
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Temperature
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="number"
            step="0.01"
            name="temperature"
            defaultValue="1.0"
          />
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        </div>
      </div>
    </form>
  );
}
