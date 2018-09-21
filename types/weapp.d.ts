declare function Component(options: any): void;

interface wx {
  [key: string]: any
}

declare const wx: wx;

declare namespace Weapp {
  interface Component {
    getRelationNodes(selector: string): any[];
    setData(data: any, callback?: Function): void;
  }

  interface Target {
    id: string;
    tagName: string;
    dataset: any;
  }

  interface Event {
    type: string;
    detail: any;
    timeStamp: number;
    target: Target;
    currentTarget: Target;
  }

  interface Touch {
    identifier: number;
    pageX: number;
    pageY: number;
    clientX: number;
    clientY: number;
  }

  interface TouchEvent extends Event {
    touches: Array<Touch>;
    changedTouches: Array<Touch>;
  }
}
