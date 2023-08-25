---
  title: 交互友好的单元格
  group: 遇到的问题
  order: 3
---

# 交互友好的单元格

## 需求

一般表格内单元格空间有限，遇到一行文字太多的情况会显示不下，而且单元格内文字折行不太美观。这就需要单元格内超出的文字用省略号显示，而且用户要能看到完整的文字，一般是在 hover 后出现。

## 解决方案

### 判断字数

首先可以想到的方法，给一个最大字数，超出的部分截断，加省略号。以 jsx 为例，可以这样写：

``` jsx | pure
// 上面拿到要渲染的表格数据 item
<>
  ...
  {item.text.length > MAX_LEN ?
    <Tooltip message={item.text}>
      {item.text.substring(
        0,
        MAX_LEN,
      ) + '...'}
    </Tooltip> 
    : 
    item.text
  }
</>
```

但是有个问题，在表格这种组件中，单元格宽度可以做响应式变化。如果窗口尺寸变宽，这种固定最大字数就不能响应变化，会出现单元格能放下一行却仍有省略的情况。

### 利用 CSS 样式

``` less

width: 100px; // 单元格需要一个固定宽度
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;

```

这样虽然做到了响应式变化，但是还需要对超出长度的文本加一个 `Tooltip`，这是纯 CSS 无法做到的。

### 封装一个组件

由于在表格渲染中，数据不是单一的，这也导致每个单元格的溢出状态是各自独有的。因此可以考虑封装一个独立的组件进行处理，好在使用的组件库提供了单元格的 `render` 属性，可以自定义渲染。下面我就自定义了一个 `OverflowTableCell` 组件：

``` tsx | pure
export type OverflowTableCellProps = {
  content: string;
};

export const OverflowTableCell: React.FC<OverflowTableCellProps> = (props) => {
  const { content } = props;
  const divRef = useRef<HTMLDivElement>(null);
  const divSize = useSize(divRef);
  const [isOverflow, setIsOverflow] = useState(false);

  useEffect(() => {
    if (divRef?.current) {
      setIsOverflow(divRef.current.scrollWidth > divRef.current.clientWidth);
    }
  }, [divRef, divSize]);
  return (
    <Tooltip message={isOverflow ? content : undefined}>
      <div
        ref={divRef}
        style={{
          maxWidth: 'calc((100vw - 600px) * 0.2)', 
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {content}
      </div>
    </Tooltip>
  );
};
```

首先使用一个 `Tooltip` 包裹 `div`，使用 `isOverflow` 状态来控制 `Tooltip` 的显隐， `div` 中使用上述 CSS 控制溢出文本的显示。然后使用了两个 hook， `useRef` 会获取 `div` 元素的宽度，当发生溢出时 `scrollWidth` 就会大于 `clientWidth`，`useSize` 会获取 `div` 元素的尺寸。当窗口大小变化时， `div` 元素尺寸也会变化，这时就要使用 `useEffect` 更新 `isOverflow` 状态。

当然上面 CSS 中 `maxWidth` 的宽度和比例可以放在 props 中进行配置，这里为了方便没有写。

### 现成的解决方案

一些功能完善的组件库在 Table 组件中给了相应的 props，可以处理这种情况，如 element-ui 中的，以及 antd 中的。但是实际开发中如果遇到使用的组件库不支持的情况，那就只能自己写了。