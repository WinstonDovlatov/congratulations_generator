from http.server import SimpleHTTPRequestHandler
from http.server import HTTPServer
from socketserver import ThreadingMixIn
from functools import partial
from vk_api_handler import send_vk_msg
from urllib.parse import parse_qs


class MyHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Allow', 'GET, HEAD, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers',
                         'Content-Type, Access-Control-Allow-Origin')
        self.send_header('Content-Length', '0')
        self.end_headers()

    def do_POST(self):
        def parse_params(params):
            id_from = params.get('id_from', ['1'])[0]
            user_id = params.get('user_id', ['1'])[0]
            text = params.get('text', ['Поздравляю!'])[0]
            character_id = params.get('character_id', ['elf'])[0]
            return {'id_from': id_from, 'user_id': user_id, 'text': text, 'character_id': character_id}

        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length).decode('utf-8')

        params = parse_params(parse_qs(post_data))
        congratulation_text = params[
                                  'text'] + f"\n\nЭто поздравление для тебя заказал https://vk.com/id{params['id_from']}."

        print(params)
        code, status = send_vk_msg(
            character_id=params['character_id'],
            user_id=params['user_id'],
            text=congratulation_text
        )

        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        self.wfile.write(status.encode('utf-8'))


class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    pass


if __name__ == "__main__":
    port = 12333
    server_address = ('', port)
    httpd = ThreadedHTTPServer(server_address, partial(MyHandler))

    print(f"Сервер запущен на порту {port}")
    httpd.serve_forever()
