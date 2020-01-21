from flask import Flask, render_template
import data_handler

app = Flask(__name__)

@app.route('/')
def board_page():
    boards_data = data_handler.get_all_boards(1)
    return render_template('boards.html', boards_data=boards_data)

if __name__ == '__main__':
    app.run(debug=True)