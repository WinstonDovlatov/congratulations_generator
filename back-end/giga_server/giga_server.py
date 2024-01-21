from http.server import SimpleHTTPRequestHandler
from http.server import HTTPServer
from socketserver import ThreadingMixIn
from functools import partial
from gigachat_wrapper import generate_congratulation
from urllib.parse import parse_qs


class MyHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers',
                         'Origin, Content-Type, Accept')
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
            character_id = params.get('character_id', ['elf'])[0]
            name = params.get('name', ['Именинник'])[0]
            holiday_id = params.get('holiday_id', ['BD'])[0]
            hobby = params.get('hobbies', [])
            sex = params.get('sex', ['M'])[0].upper()
            return {'character_id': character_id, 'name': name, 'holiday_id': holiday_id, 'hobby': hobby, 'sex': sex}

        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length).decode('utf-8')

        prompt_params = parse_params(parse_qs(post_data))
        congratulation = generate_congratulation(**prompt_params)

        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        self.wfile.write(congratulation.encode('utf-8'))


class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    pass


if __name__ == "__main__":
    port = 12345
    server_address = ('', port)
    httpd = ThreadedHTTPServer(server_address, partial(MyHandler))

    print(f"Сервер запущен на порту {port}")
    httpd.serve_forever()
