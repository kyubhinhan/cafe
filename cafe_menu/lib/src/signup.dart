import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';

class Signup extends StatefulWidget {
  const Signup({super.key});

  @override
  State<Signup> createState() => _Signup();
}

class _Signup extends State<Signup> {
  final nameController = TextEditingController();
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  late dynamic emailValid;

  @override
  void dispose() {
    nameController.dispose();
    emailController.dispose();
    passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    final ButtonStyle style =
        ElevatedButton.styleFrom(textStyle: const TextStyle(fontSize: 20));
    return Center(
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
            Focus(
              child: TextFormField(
                  style: TextStyle(decorationThickness: 0),
                  controller: emailController,
                  decoration: const InputDecoration(
                      border: UnderlineInputBorder(), labelText: '이메일')),
              onFocusChange: (hasFocus) {
                if (!hasFocus) {
                  print(fetchEmail(emailController.text));
                }
              },
            ),
            TextFormField(
                controller: passwordController,
                decoration: const InputDecoration(
                    border: UnderlineInputBorder(), labelText: '비밀번호'),
                obscureText: true),
            SizedBox(height: 20),
            ElevatedButton(
              style: style,
              onPressed: () {},
              child: const Text('회원 가입'),
            ),
          ],
        ),
      ),
    );
  }
}

Future<Email> fetchEmail(email) async {
  final response = await http
      .get(Uri.parse('http://10.0.2.2/signup/duplicate?email=$email'));

  if (response.statusCode == 200) {
    return Email.fromJson(jsonDecode(response.body));
  } else {
    throw Exception('Failed to load Email');
  }
}

class Email {
  final String email;

  const Email({required this.email});

  factory Email.fromJson(Map<String, dynamic> json) {
    return Email(email: json['email']);
  }
}
