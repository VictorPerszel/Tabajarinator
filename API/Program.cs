using System.Text;
using API.Data;
using API.Extensions;
using API.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

builder.Services.AddCors(options => options.AddPolicy("euodeiotrabalharcomcors",
                          policy =>
                          {
                              policy.WithOrigins("https://localhost:4200",
                                                  "http://localhost:4200")
                                                  .AllowAnyHeader()
                                                  .AllowAnyMethod();
                          }));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors("euodeiotrabalharcomcors");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
