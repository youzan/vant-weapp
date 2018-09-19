declare function Component(options: any): void;

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

  interface CustomEvent extends Event {
    detail: any;
  }
}

export {
  Weapp
};
