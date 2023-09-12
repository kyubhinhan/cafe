import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:cafe_menu/auth.dart';
import 'package:go_router/go_router.dart';

class Signup extends StatefulWidget {
  const Signup({super.key});

  @override
  State<Signup> createState() => _Signup();
}

class _Signup extends State<Signup> {
  final nameController = TextEditingController();
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  final _formKey = GlobalKey<FormState>();
  var emailDuplicated = false;

  @override
  void dispose() {
    nameController.dispose();
    emailController.dispose();
    passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final AuthService auth = AuthService();
    double screenWidth = MediaQuery.of(context).size.width;
    final ButtonStyle style =
        ElevatedButton.styleFrom(textStyle: const TextStyle(fontSize: 20));
    return Scaffold(
      appBar: AppBar(title: const Text('회원가입')),
      body: Center(
        child: SizedBox(
          width: screenWidth * 0.8,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              TextFormField(
                  style: TextStyle(decorationThickness: 0),
                  autofocus: true,
                  controller: nameController,
                  decoration: const InputDecoration(
                      border: UnderlineInputBorder(), labelText: '이름')),
              Form(
                key: _formKey,
                child: Focus(
                  child: TextFormField(
                    style: TextStyle(decorationThickness: 0),
                    controller: emailController,
                    decoration: const InputDecoration(
                        border: UnderlineInputBorder(), labelText: '이메일'),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter some text';
                      }
                      if (emailDuplicated) {
                        return '중복된 이메일입니다.';
                      }
                      return null;
                    },
                  ),
                  onFocusChange: (hasFocus) async {
                    if (!hasFocus) {
                      var duplicated =
                          await checkDuplicate(emailController.text);
                      setState(() {
                        emailDuplicated = duplicated;
                      });
                      if (_formKey.currentState!.validate()) {
                        print('valid');
                      }
                    }
                  },
                ),
              ),
              TextFormField(
                  controller: passwordController,
                  decoration: const InputDecoration(
                      border: UnderlineInputBorder(), labelText: '비밀번호'),
                  obscureText: true),
              SizedBox(height: 20),
              ElevatedButton(
                style: style,
                onPressed: () async {
                  await auth.signUp(emailController.text,
                      passwordController.text, nameController.text);

                  if (!mounted) return;
                  context.go('/');
                },
                child: const Text('회원 가입'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

Future<bool> checkDuplicate(email) async {
  final response = await http
      .get(Uri.parse('http://10.0.2.2:5000/signup/duplicate?email=$email'));

  if (response.statusCode == 200) {
    return Duplicate.fromJson(jsonDecode(response.body)).isDuplicate;
  } else {
    throw Exception('Failed to check duplicate');
  }
}

class Duplicate {
  final bool isDuplicate;

  const Duplicate({required this.isDuplicate});

  factory Duplicate.fromJson(Map<String, dynamic> json) {
    return Duplicate(isDuplicate: json['isDuplicate']);
  }
}
