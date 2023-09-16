import { env, pipeline } from "@xenova/transformers";

// Skip local model check
// @ts-ignore
env.allowLocalModels = false;

// Use the Singleton pattern to enable lazy construction of the pipeline.
class PipelineSingleton {
  static task = "text-generation";
  static model = "ymruki/kakkolang";
  static instance: any = null;

  static async getInstance(progress_callback: any = null) {
    console.log("getInstance");
    if (this.instance === null) {
      console.log("inst!");
      this.instance = pipeline(this.task, this.model, { progress_callback });
    }
    return this.instance;
  }
}

addEventListener("message", async (event: MessageEvent) => {
  // Retrieve the classification pipeline. When called for the first time,
  // this will load the pipeline and save it for future use.
  let generate = await PipelineSingleton.getInstance((x: any) => {
    // We also add a progress callback to the pipeline so that we can
    // track model loading.
    postMessage(x);
  });

  // Actually perform the classification
  let output = await generate(event.data.text, event.data.options);
  console.log(output);

  // Send the output back to the main thread
  postMessage({
    status: "complete",
    output: output,
  });
});
