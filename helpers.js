export function isolate(context, callback) {
  context.save();
  context.beginPath();
  callback(context);
  context.closePath();
  context.restore();
}
