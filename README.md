## HOW TO RUN THE TEST SCRIPT:

Recommend has install on local machine `JDK 1.8+` (require to start Selenium Server), `Node.JS` (Install Node.js <=v18), `python>3` to use sync mode

- Install Node v18
- Install Java 8
- Install python 3
- SET JAVA_HOME path

Install lib `$ npm install`

Start test `$ npm run f L-01`




# Specs (Feature Files)
- Specs (hoặc feature files) chứa các kịch bản kiểm thử viết bằng ngôn ngữ tự nhiên, thường sử dụng định dạng Gherkin
- https://anhtester.com/blog/gherkin-la-gi-cau-truc-cua-mot-gherkin-trong-cucumber-b413.html

# Step Definitions
- Step Definitions là nơi định nghĩa các hành động cụ thể cho từng bước trong kịch bản kiểm thử
- Kết nối giữa kịch bản trong specs và các phương thức trong page objects.


# Page Objects
- Page Objects là một mẫu thiết kế được sử dụng trong kiểm thử tự động để trừu tượng hóa và tổ chức các hành động và trạng thái của các trang trong ứng dụng
- Định nghĩa các phương thức tương tác với trang.

# Core/Control.js
- Thường được sử dụng để định nghĩa các phương thức hỗ trợ (WebriverIo), Có thể sử dụng trong các bước kiểm thử hoặc trong các page objects
- https://webdriver.io/docs/api/element

# File wdio.conf.js 
- Cấu hình chính cho WebdriverIO, nơi định nghĩa các thiết lập và tùy chọn cần thiết cho quá trình kiểm thử tự động
- Đường dẫn đến các file kiểm thử: 
         specs: ['./src/specs/**/*.js'],

# File package.json
- Cấu hình quan trọng trong các dự án JavaScript, đặc biệt là những dự án sử dụng Node.js. Đây là nơi lưu trữ thông tin về dự án, bao gồm các thông tin về phụ thuộc, scripts, metadata và các cấu hình khác.
- Dependencies: Danh sách các thư viện cần thiết cho dự án trong môi trường sản xuất. Các thư viện này sẽ được cài đặt khi chạy lệnh npm install.
- DevDependencies: Danh sách các thư viện cần thiết cho quá trình phát triển, chẳng hạn như các công cụ kiểm thử hoặc biên dịch. Các thư viện này không cần thiết cho môi trường sản xuất
- Scripts: Các lệnh có thể chạy từ dòng lệnh bằng cách sử dụng npm run <script-name>




------------------------------

## tài liệu liên quan
#	Set up devices				
		Install Java	https://www.oracle.com/java/technologies/javase/javase8-archive-downloads.html		
		Install Node.js v16 < v18)	https://nodejs.org/en/download/releases/		
		Install Vscode	https://code.visualstudio.com/download		
		Install Git	https://git-scm.com/download/win		
					
					
#	Research auto				
		Read document WebdriverIO	https://v7.webdriver.io/		
		Read document WebdriverIO API	https://v7.webdriver.io/docs/api		tab: Brower / element
		Read document for Cucumber	https://cucumber.io/docs/gherkin/		
		Learn NodeJs			
		-- Syntax	https://www.w3schools.com/js/js_syntax.asp		
		-- Variales	https://www.w3schools.com/js/js_variables.asp		
		-- Js Let	https://www.w3schools.com/js/js_let.asp		
		-- Js Const	https://www.w3schools.com/js/js_const.asp		
		-- Js Operators	https://www.w3schools.com/js/js_operators.asp		
		-- Js Assignment	https://www.w3schools.com/js/js_assignment.asp		
		-- Js Data types	https://www.w3schools.com/js/js_datatypes.asp		
		-- Functions	https://www.w3schools.com/js/js_functions.asp		
		-- String method	https://www.w3schools.com/js/js_string_methods.asp		
		-- Array	https://www.w3schools.com/js/js_arrays.asp		
		-- Booleans	https://www.w3schools.com/js/js_booleans.asp		
		-- Comparision	https://www.w3schools.com/js/js_comparisons.asp		
		-- If else	https://www.w3schools.com/js/js_if_else.asp		
		-- Switch	https://www.w3schools.com/js/js_switch.asp		
		-- Loop for	https://www.w3schools.com/js/js_loop_for.asp		
		-- Loop for in	https://www.w3schools.com/js/js_loop_forin.asp		
		-- Loop while	https://www.w3schools.com/js/js_loop_while.asp		
		-- Break	https://www.w3schools.com/js/js_break.asp		
		-- Classes	https://www.w3schools.com/js/js_classes.asp		
		-- Modules	https://www.w3schools.com/js/js_modules.asp		
		Learn Xpath	https://viettuts.vn/selenium/xpath-trong-selenium-webdriver		
		POM	https://viettuts.vn/selenium/page-object-model-trong-selenium		
					
#	Clone project				
		Generate SSH Key	Steps in link: https://help.github.com/en/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent		
		Clone Source	https://gitlab.kegmil.co/front-end/km-web-ui-automation		
		Test basic git comment line: pull/push code	https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository		
		Train Kegmil business			
					
#	Read Auto FW			
		Find readme.md file			
		Read flow chart			
		Trainning using FW control, utils			
		Running test case			
		Running and check allure report			
					
#	Write first test case				
		Rule/PR/Convention: Find readme.md file			