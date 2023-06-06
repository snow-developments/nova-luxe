const HOME = nova.environment["HOME"] || "~";

// Application types
// See https://en.wikipedia.org/wiki/Uniform_Type_Identifier
const MAC_APP = "app";
const UNIX_APP = "public.unix-executable";

const LUXE_SDK = `${HOME}/.luxe`;
const LUXE_EXE = `${LUXE_SDK}/bin/luxe`;

class TaskProvider {
  constructor() {}

  /**
   * @param context TaskActionResolveContext
   */
  async resolveTaskAction(context) {
    if (context.action === Task.Clean) return null;
    // TODO: Are there things to cleanup on behalf of luxe?
    // else if (context.action.type === Task.Clean)
    // See https://docs.nova.app/api-reference/configuration/#getkey-coerce
    const config = context.config;

    let launchPath = config.get("launchPath", "string") || "project.luxe";
    if (!launchPath) throw "Invalid luxe task configuration: You must provide a Program to launch or attach to.";
    /** @type string[] */
    const launchArgs = config.get("launchArgs", "array") || [];
    const cwd = nova.path.normalize(config.get("cwd", "string") || nova.workspace.path);

    const action = new TaskProcessAction(LUXE_EXE, {
      // FIXME: Why doesn't the build task work?
      args: [context.action === Task.Run ? "run" : "build", launchPath].concat(launchArgs),
      stdio: ["ignore", "pipe", "pipe"],
      cwd,
      // See https://docs.nova.app/extensions/issue-matchers
      // See https://regex101.com/r/tY9P8M/1
      matchers: ["luxe"]
    });

    // Launch the debugee
    console.log(`launching luxe app: "${launchPath}"`);
    return action;
  }
}
exports.TaskProvider = TaskProvider;
