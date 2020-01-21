import connection_handler

@connection_handler.db_connection
def get_boards_titles(cursor, user_id):
    try:
        statement_str = '''SELECT id, title FROM boards
                            WHERE user_id=%(user_id)s
                            ORDER BY id'''
        cursor.execute(statement_str, {'user_id': user_id})
        boards_titles = cursor.fetchall()
    except AttributeError:
        boards_titles = None
    return boards_titles

def get_user_id(cursor, username):
    pass

@connection_handler.db_connection
def get_columns(cursor, board_id):
    statement_str = '''SELECT id, title, col_order, board_id FROM columns
                        WHERE board_id=%(board_id)s
                        ORDER BY col_order'''
    cursor.execute(statement_str, {'board_id': board_id})
    columns = cursor.fetchall()
    return columns

@connection_handler.db_connection
def get_cards(cursor, column_id):
    statement_str = '''SELECT title, card_order, column_id FROM cards 
                        WHERE column_id=%(column_id)s
                        ORDER BY card_order'''
    cursor.execute(statement_str, {'column_id': column_id})
    cards = cursor.fetchall()
    return cards

def get_all_boards(user_id):
    boards = get_boards_titles(user_id)

    for board in boards:
        board_id = board['id']
        board_cols = get_columns(board_id)

        # create new list as a value of columns_data key in board dict
        board['columns_data'] = []
        columns_data = board['columns_data']

        for column in board_cols:
            col_id = column['id']
            column_cards = get_cards(col_id)

            column['cards'] = []
            cards_data = column['cards']

            for card in column_cards:
                # append card data to cards list in column
                cards_data.append(card)
            # append column to columns_data in board
            columns_data.append(column)

    return boards
