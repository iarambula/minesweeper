import React, { useState, useEffect, useCallback } from 'react';

function App() {
  const [form, setForm] = useState({
    rows: 10,
    cols: 10,
    mines: 10,
  });
  const [board, setBoard] = useState<string[][]>([]);
  const initializeBoard = useCallback(() => {
    let arr: string[][] = [];
    let remainingCells = form.rows * form.cols;
    let remainingMines = form.mines;

    for (let row = 0; row < form.rows; row++) {
      arr.push([]);
      for (let col = 0; col < form.cols; col++) {
        arr[row].push("-");
      }
    }

    // The following code block is the most efficient way I
    // know to initialize a minesweeper board
    for (let row = 0; row < form.rows; row++) {
      for (let col = 0; col < form.cols; col++) {
        const probability = remainingMines / remainingCells;
        if (Math.random() < probability) {
          arr[row][col] = "*";
          remainingMines--;
        }
        remainingCells--;
      }
    }

    setBoard(arr);
  }, [form]);

  useEffect(() => {
    initializeBoard();
  }, [initializeBoard]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    initializeBoard();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="rows">Rows</label>
          <input type="number" id="rows" name="rows" onChange={handleChange} value={form.rows} />
        </div>
        <div>
          <label htmlFor="cols">Columns</label>
          <input type="number" id="cols" name="cols" onChange={handleChange} value={form.cols} />
        </div>
        <div>
          <label htmlFor="mines">Mines</label>
          <input type="number" id="mines" name="mines" onChange={handleChange} value={form.mines} />
        </div>
        <div>
          <button type="submit">Regenerate</button>
        </div>
      </form>
      <div className="board">
        {
          board.map((row) => (
            <div className="row">
              {
                row.map((col) => (
                  <div className="col">{col}</div>
                ))
              }
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
