function showLoginRegister(auth){
				

					 
                    $register_form = $(
					'<form id="register">' + '<h1>Create Account</h1>' +
                    '<input type="text" name="register-email" id="register-email" value="Email">' +  
                    '<input type="password" name="register-password" id="register-password" value="password">' + 
                    '<input type="submit" name="submit" value="Register" id="submit"/>'+'</form>'
					)

                    $login_form = $(
					'<form id="login">'+ '<h1>Login</h1>' +
					'<input type="text" name="login-email" id="login-email" value="Email">'+
                    '<input type="password" name="login-password" id="login-password" value="password">'+
                    //'<input type="checkbox" name="rememberCheckbox" id="rememberCheckbox" checked>'+
                    '<input type="submit" name="submit" "value="Sign in" id="submit"/>'+'</form>'
					)
                    
					$('#login_or_register').append($register_form,$login_form);

                    $("#register").submit(function() {
						
                    var email = $("#register-email").val();
                    var password = $("#register-password").val();
                    
					var ref = new Firebase('https://burning-heat-294.firebaseio.com/');
					ref.createUser({
					  email    : email,
					  password : password
					}, function(error, userData) {
					  if (error) {
						console.log("Error creating user:", error);
					  } else {
						console.log("Successfully created user account with uid:", userData.uid);
					  }
					});

						return false;

						
                    });

                    $("#login").submit(function() {
						var email = $("#login-email").val();
						var password = $("#login-password").val();
						var checkbox = $("#rememberCheckbox").val();
						ref.login("password", {
								email: email,
								password: password,
								rememberMe: checkbox
							});
							return false;

                    });  
                };


                var ref = new Firebase('https://burning-heat-294.firebaseio.com/');
                var auth = new FirebaseSimpleLogin(ref, function(error, user) {
                    if (error){
                        console.log(error);
                      return;
                  }
                  if (user) {
                    // user authenticated with Firebase
                        $("#logout").click(function(){
                            auth.logout();
                       })
                  } 
                  else {
                    showLoginRegister(this);
                      // user is logged out
                  }
                });