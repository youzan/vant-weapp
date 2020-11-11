type CanvasContext = WechatMiniprogram.CanvasContext;

export function adaptor(
  ctx: CanvasContext & Record<string, unknown>
): CanvasContext {
  // @ts-ignore
  return Object.assign(ctx, {
    setStrokeStyle(val) {
      ctx.strokeStyle = val;
    },
    setLineWidth(val) {
      ctx.lineWidth = val;
    },
    setLineCap(val) {
      ctx.lineCap = val;
    },
    setFillStyle(val) {
      ctx.fillStyle = val;
    },
    setFontSize(val) {
      ctx.font = String(val);
    },
    setGlobalAlpha(val) {
      ctx.globalAlpha = val;
    },
    setLineJoin(val) {
      ctx.lineJoin = val;
    },
    setTextAlign(val) {
      ctx.textAlign = val;
    },
    setMiterLimit(val) {
      ctx.miterLimit = val;
    },
    setShadow(offsetX, offsetY, blur, color) {
      ctx.shadowOffsetX = offsetX;
      ctx.shadowOffsetY = offsetY;
      ctx.shadowBlur = blur;
      ctx.shadowColor = color;
    },
    setTextBaseline(val) {
      ctx.textBaseline = val;
    },
    createCircularGradient() {},
    draw() {},
  });
}
