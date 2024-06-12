export class WebComponentTracker {
  private static instances = new Set();

  public static register(id: string) {
    if (WebComponentTracker.instances.has(id)) {
      return false;
    }

    WebComponentTracker.instances.add(id);
    return true;
  }
}
