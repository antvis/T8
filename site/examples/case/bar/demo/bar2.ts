import { Chart } from '@antv/g2';

fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
  .then((res) => res.json())
  .then((data) => data.map((d) => ({ ...d, Date: new Date(d.Date) })))
  .then((data) => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      theme: 'classic',
    });

    chart
      .line()
      .data(data)
      .encode('x', 'Date')
      .encode('y', 'scales')
      .encode('color', 'steelblue')
      .axis('y', { tickFormatter: '.0%' });

    chart.interaction('tooltip', {
      position: 'auto',
      render: (event, { title, items }) => `
        <div
          style="
            width: 300px;
            background: #f2f2f2;
            border-radius: 10px;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 10px;
            margin: -12px;
          "
        >
          <h2
            style="
              margin-bottom: 9px; 
              font-size: 18px; 
              line-height: 30px; 
              font-weight: 500px"
          >
            Letter: ${title}
          </h2>
          ${items.map(
            (item) =>
              `<div style="font-size: 16px; color: #666">name: ${item.name}
                <br/>
                value: 
                <div style="width:200px;height:10px;display:inline-block;background:${item.color}"></div>
                ${item.value}
              </div>`,
          )}
        </div>
        `,
    });

    chart.render();
  });
